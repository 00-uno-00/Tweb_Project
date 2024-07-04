package utils.springboot_server.Team;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * TeamRepository interface for handling team-related database operations.
 * Extends JpaRepository to leverage Spring Data JPA's repository capabilities.
 */
public interface TeamRepository extends JpaRepository<Team, String> {

    /**
     * Finds teams by their championship ID.
     *
     * @param championship The ID of the championship to filter teams by.
     * @return A list of teams participating in the specified championship.
     */
    @Query("SELECT t FROM Team t WHERE t.domesticCompetitionId = ?1")
    List<Team> findByChampionship(String championship);

    /**
     * Finds teams that were active in the last season (2023).
     *
     * @param b A boolean value, not used in the query but required for method signature compatibility.
     * @return A list of teams that were active in the last season.
     */
    @Query("SELECT t FROM Team t WHERE t.lastSeason = 2023")
    List<Team> findByActive(boolean b);

    /**
     * Finds teams by name, ignoring case, and supports pagination.
     *
     * @param query The name query string to search for.
     * @param page Pageable object to support pagination.
     * @return A list of teams whose names contain the query string, case-insensitive.
     */
    List<Team> findByNameContainingIgnoreCase(String query, Pageable page);
}