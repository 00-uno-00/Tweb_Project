package utils.springboot_server.CTIS;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Repository interface for CTI (Calcio Trends Impact) Score entities.
 * Extends JpaRepository to provide CRUD operations and custom queries for CTI Score entities.
 */
public interface CTIRepository extends JpaRepository<CTIS, Long> {

    /**
     * Custom query to find the CTI score for a specific player by their ID.
     * @param id The ID of the player whose CTI score is to be retrieved.
     * @return The CTI score of the specified player.
     */
    @Query(value = "SELECT score FROM cti_score WHERE player_id = :id", nativeQuery = true)
    Integer findScoreById(long id);

    /**
     * Custom query to find CTI scores for a list of player IDs.
     * @param playerIds The list of player IDs whose CTI scores are to be retrieved.
     * @return A list of CTI scores for the specified player IDs.
     */
    @Query(value = "SELECT * FROM cti_score WHERE player_id IN :playerIds", nativeQuery = true)
    List<Integer> findScoreByList(List<Long> playerIds);

    /**
     * Custom query to retrieve the top 15 CTI scores from the database.
     * @return A list of CTIS entities representing the top 15 CTI scores.
     */
    @Query(value = "SELECT * FROM cti_score ORDER BY score DESC LIMIT 15", nativeQuery = true)
    List<CTIS> findTop15();
}