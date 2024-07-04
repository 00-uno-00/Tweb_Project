package utils.springboot_server.Team;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for team-related operations.
 * Provides methods to interact with the TeamRepository for CRUD operations and custom queries.
 */
@Service
public class TeamService {
    private final TeamRepository teamRepository;

    /**
     * Constructs a TeamService with dependency injection for the TeamRepository.
     * @param teamRepository The repository used for team operations.
     */
    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    /**
     * Retrieves a team by its ID.
     * @param id The ID of the team.
     * @return The team with the specified ID, or null if not found.
     */
    public Team getTeamById(String id) {
        return teamRepository.findById(id).orElse(null);
    }

    /**
     * Retrieves all teams, sorted by name.
     * @return A list of all teams, sorted alphabetically by name.
     */
    public List<Team> getAllTeams() {
        return teamRepository.findAll(Sort.by("name"));
    }

    /**
     * Retrieves teams by their championship.
     * @param championship The championship to filter teams by.
     * @return A list of teams participating in the specified championship.
     */
    public List<Team> getTeamsByChampionship(String championship) {
        return teamRepository.findByChampionship(championship);
    }

    /**
     * Retrieves all active teams.
     * Active teams are defined by a specific criteria in the repository layer.
     * @return A list of active teams.
     */
    public List<Team> getActiveTeams() {
        return teamRepository.findByActive(true);
    }

    /**
     * Searches for teams based on a query string.
     * Supports pagination through a Pageable object.
     * @param query The query string used for searching.
     * @param page Pageable object to support pagination.
     * @return A list of teams whose names contain the query string, case-insensitive.
     */
    public List<Team> searchTeams(String query, Pageable page) {
        return teamRepository.findByNameContainingIgnoreCase(query, page);
    }

    /**
     * Retrieves the total number of teams.
     * @return The total number of teams in the database.
     */
    public Long getNumberOfTeams() {
        return teamRepository.count();
    }
}