import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import calculator as calc
from dataclasses import dataclass, field
from typing import List
import csv
import json

@dataclass
class Player:
    player_id: int
    market_value_in_eur: float
    position: str

@dataclass
class Appearance:
    player_id: int
    yellow_cards: int
    red_cards: int
    goals: int
    assists: int
    date: str
    game_id: int

@dataclass
class PlayerStats:
    player_id: int
    market_value_in_eur: str
    position: str
    yellow_cards: List[int] = field(default_factory=list)
    red_cards: List[int] = field(default_factory=list)
    goals: List[int] = field(default_factory=list)
    assists: List[int] = field(default_factory=list)
    dates: List[str] = field(default_factory=list)
    game_ids: List[int] = field(default_factory=list)

def load_players_from_csv(file_path: str) -> List[Player]:
    players = []
    with open(file_path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            player = Player(
                player_id=int(row['player_id']),
                market_value_in_eur=row['market_value_in_eur'],
                position=row['position']
            )
            players.append(player)
    return players

def load_appearances_from_csv(file_path: str) -> List[Appearance]:
    appearances = []
    with open(file_path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            appearance = Appearance(
                player_id=int(row['player_id']),
                yellow_cards=int(row['yellow_cards']),
                red_cards=int(row['red_cards']),
                goals=int(row['goals']),
                assists=int(row['assists']),
                date=row['date'],
                game_id=int(row['game_id'])
            )
            appearances.append(appearance)
    return appearances


def filter_last_season(app: List[Appearance], filter_year: str) -> List[Appearance]:
    return [appearance for appearance in app if filter_year in appearance.date]

def merge_and_select_columns(players: List[Player], appearances: List[Appearance]) -> List[PlayerStats]:
    player_stats = []
    for player in players:
        matching_appearances = [app for app in appearances if app.player_id == player.player_id]
        if matching_appearances:
            stats = PlayerStats(
                player_id=player.player_id,
                market_value_in_eur=player.market_value_in_eur,
                position=player.position,
                yellow_cards=[app.yellow_cards for app in matching_appearances],
                red_cards=[app.red_cards for app in matching_appearances],
                goals=[app.goals for app in matching_appearances],
                assists=[app.assists for app in matching_appearances],
                dates=[app.date for app in matching_appearances],
                game_ids=[app.game_id for app in matching_appearances]
            )
            player_stats.append(stats)
    return player_stats

def group_by_player(player_stats: List[PlayerStats]) -> List[PlayerStats]:
    # Grouping is inherently handled by the merge_and_select_columns function in this approach
    return player_stats

def filter(filter_year: str, players: List[Player], app: List[Appearance]) -> List[PlayerStats]:
    appearances_last_season = filter_last_season(app, filter_year)
    merged_data = merge_and_select_columns(players, appearances_last_season)
    grouped_data = group_by_player(merged_data)
    return grouped_data

def calculate_score(player_stats: PlayerStats) -> float:
    """
    Calculate the score for a player based on the given formula.
    
    Parameters:
    player_stats (PlayerStats): An instance of PlayerStats containing player and their appearances.
    
    Returns:
    float: The calculated score for the player.
    """
    score = 1
    
    for i in range(len(player_stats.game_ids)):
        position_coefficient = 1 + ((player_stats.position in ['attack', 'midfield']) * 0.2)
        assist_score = player_stats.assists[i] * 0.45
        goal_score = player_stats.goals[i] * position_coefficient
        yellow_card_score = player_stats.yellow_cards[i] * -0.2
        if player_stats.position == 'defense':
            yellow_card_score *= -1
        red_card_score = player_stats.red_cards[i] * -0.5
        
        game_score = goal_score + yellow_card_score + red_card_score + assist_score
        score += game_score
        
    return score/len(player_stats.game_ids)

def normalize_scores(scores):
    """
    Normalize the scores to be between 1 and 10.
    
    Parameters:
    scores (list): A list of scores for all players.
    
    Returns:
    list: A list of normalized scores between 1 and 100.
    """
    min_score = min(scores)
    max_score = max(scores)
    normalized_scores = [1 + (score - min_score) * (100 - 1) / (max_score - min_score) for score in scores]
    return normalized_scores

if __name__ == "__main__":

    # Load data
    players = load_players_from_csv("Assignment_Data/players.csv")
    app = load_appearances_from_csv("Assignment_Data/appearances.csv")
    year = "2022"
    # Example usage
    grouped_df = filter(year, players, app)
    
    print("Calculating...")
    # Calculate scores for each player
    player_scores = []
    for player in grouped_df:
        score = calculate_score(player)
        player_scores.append({
            'player_id': player.player_id,
            'year': year,
            'score': score
        })
    print("Scores calculated")
    print("Normalizing...")
    # Normalize scores
    normalized_scores = normalize_scores([player['score'] for player in player_scores])

    # Update scores with normalized values
    for i, player in enumerate(player_scores):
        player['score'] = normalized_scores[i]

    # Write scores to JSON file
    with open('scores22.json', 'w') as json_file:
        json.dump(player_scores, json_file)
        
    print("Scores normalized and saved to scores22.json")