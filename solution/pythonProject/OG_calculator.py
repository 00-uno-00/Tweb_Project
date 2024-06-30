import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

def filter_last_season(app, filter_year):
    """
    Filter appearances for the filter_year dropping null values.
    """
    appearances_last_season_df = app[app['date'].str.contains(filter_year, na=False)]
    appearances_last_season_df = appearances_last_season_df.dropna(subset=['yellow_cards', 'red_cards', 'goals', 'assists'])
    return appearances_last_season_df

def merge_and_select_columns(players, appearances_last_season_df):
    """
    Merge player data with filtered appearances and select necessary columns.
    """
    merged_df = pd.merge(players, appearances_last_season_df, on='player_id', how='inner')
    selected_columns = ['player_id', 'market_value_in_eur', 'position', 'yellow_cards', 'red_cards', 'goals', 'assists', 'date',  'game_id']
    merged_df = merged_df[selected_columns]
    merged_df = merged_df.dropna(subset=['yellow_cards', 'red_cards', 'goals', 'assists'])
    return merged_df

def group_by_player(merged_df):
    """
    Group by player and aggregate game statistics.
    """
    grouped_df = merged_df.groupby('player_id').agg({
        'market_value_in_eur': 'first',
        'position': 'first',
        'yellow_cards': list,
        'red_cards': list,
        'goals': list,
        'assists': list,
        'date': list,
        'game_id': list
    }).reset_index()
    return grouped_df

def filter(filter_year):
    """
    Main function to load data, filter, merge, and group.
    """
    appearances_last_season_df = filter_last_season(app, filter_year)
    merged_df = merge_and_select_columns(players, appearances_last_season_df)
    grouped_df = group_by_player(merged_df)
    return grouped_df


def calculate_score(player_data):
    """
    Calculate the score for a player based on the given formula.
    
    Parameters:
    player_data (tuple): A tuple containing position, a list of yellow cards, red cards, goals, and game ids.
    
    Returns:
    float: The calculated score for the player.
    """
    position, yellow_cards, red_cards, goals, assists, game_ids = player_data[1:7]
    score = 1
    
    for i in range(len(game_ids)):
        position_coefficient = 1+((position in ['attack', 'midfield']) * 0.2)
        assist_score = int(assists[i]) * 0.45
        goal_score = goals[i] * position_coefficient
        yellow_card_score = yellow_cards[i] * -0.2
        if position == 'defense':
            yellow_card_score *= -1
        red_card_score = red_cards[i] * -0.5
        
        game_score = goal_score + yellow_card_score + red_card_score + assist_score
        score += game_score
        
    return score

if __name__ == "__main__":
    """
    Main function to calculate the score for each player.
    """
    app = pd.read_csv("Assignment_Data/appearances.csv")
    players = pd.read_csv("Assignment_Data/players.csv")
    
    filter_year = '2023'
    data = filter(filter_year)
    scores = [calculate_score(player_data) for player_data in data]