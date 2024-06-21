package utils.springboot_server.Player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Long> {

    /**
     * Retrieves the list of the top 15 players with the highest score.
     * The score is calculated based on the player's performance in the last season (2023).
     *
     * @return A list of Player objects. Each Player object represents a player with the highest score in the last season (2023).
     */
    @Query(value = "SELECT * FROM players WHERE last_season = 2023 ORDER BY score DESC LIMIT 15", nativeQuery = true)
    List<Player> findTopPlayersByScore();//TODO connect with mongo and retrieve calculated score from there

    /**
     * Retrieves a list of players who are currently associated with a specific club.
     * The club is identified by its unique ID. Only players who were part of the club in the last season (2023) are considered.
     *
     * @param clubId The unique identifier of the club. This is used to filter the players.
     * @return A list of Player objects. Each Player object represents a player who was part of the specified club in the last season (2023).
     * If no players are found for the given club ID, an empty list is returned.
     */
    @Query(value = "SELECT * FROM players WHERE current_club_id = :clubId AND last_season = 2023", nativeQuery = true)
    List<Player> findByCurrentClubId(long clubId);

    /**
     * Retrieves a specific player by its name.
     *
     * @param name The name of the player to retrieve.
     * @return the player with the given name.
     */
    @Query(value = "SELECT * FROM players WHERE LOWER(name) = LOWER(:name)", nativeQuery = true)
    Player findByName(String name);

    /**
     * Retrieves a specific player by its ID.
     *
     * @param id The ID of the player to retrieve.
     * @return the player with the given ID.
     */
    @Query(value = "SELECT * FROM players WHERE player_id = :id", nativeQuery = true)
    Player findById(long id);

    /**
     * Retrieves a list of players by their IDs.
     *
     * @param ids The list of player IDs to retrieve.
     * @return A list of Player objects. Each Player object represents a player with the given ID.
     */
    @Query(value = "SELECT * FROM players WHERE id IN :ids", nativeQuery = true)
    List<Player> findAllById(List<Long> ids);


}
