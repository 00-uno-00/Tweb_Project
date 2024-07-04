package utils.springboot_server.Championship;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Repository interface for Championship entities.
 * Extends JpaRepository to provide CRUD operations and custom queries for Championship entities.
 */
public interface ChampionshipRepository extends JpaRepository<Championship, String>{

    /**
     * Custom query to find all first-tier championships, ordered by name.
     * @return A list of Championships that are classified as first-tier.
     */
    @Query("SELECT c FROM Championship c WHERE c.subType = 'first_tier' ORDER BY c.name")
    List<Championship> findFirstTierChampionships();

    /**
     * Finds championships by name containing the given query string, ignoring case.
     * @param query The query string to search for within the championship name.
     * @param page Pageable object to support pagination.
     * @return A list of Championships whose names contain the given query string.
     */
    List<Championship> findByNameContainingIgnoreCase(String query, Pageable page);

    /**
     * Custom query to find a championship by its exact name.
     * @param name The exact name of the championship to find.
     * @return The Championship entity if found, otherwise null.
     */
    @Query("SELECT c FROM Championship c WHERE c.name = :name")
    Championship findByName(String name);
}