package utils.springboot_server.Team;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class for team-related operations.
 * Handles HTTP requests for operations on teams, such as retrieving teams by various criteria,
 * and searching for teams based on a query.
 */
@RestController
@RequestMapping("/Team")
public class TeamController {
    private final TeamService teamService;

    /**
     * Constructs a TeamController with a dependency on TeamService.
     * @param teamService The service used for team operations.
     */
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    /**
     * Retrieves a team by its ID.
     * @param id The ID of the team.
     * @return The team with the specified ID.
     */
    @GetMapping("/getTeamById/{id}")
    public Team getTeamById(@PathVariable String id) {
        return teamService.getTeamById(id);
    }

    /**
     * Retrieves all teams.
     * @return A list of all teams.
     */
    @GetMapping("/getAllTeams")
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }

    /**
     * Retrieves teams by championship.
     * @param championship The championship name.
     * @return A list of teams participating in the specified championship.
     */
    @GetMapping("/getTeamsByChampionship/{championship}")
    public List<Team> getTeamsByChampionship(@PathVariable String championship) {
        return teamService.getTeamsByChampionship(championship);
    }

    /**
     * Retrieves all active teams.
     * @return A list of active teams.
     */
    @GetMapping("/getActiveTeams")
    public List<Team> getActiveTeams() {
        return teamService.getActiveTeams();
    }

    /**
     * Retrieves the total number of teams.
     * @return The total number of teams.
     */
    @GetMapping("/getNumberOfTeams")
    public Long getNumberOfTeams() {
        return teamService.getNumberOfTeams();
    }

    /**
     * Searches for teams based on a query string.
     * @param query The query string used for searching.
     * @return A ResponseEntity containing the list of teams matching the query and the HTTP status code.
     */
    @GetMapping("/search")
    public ResponseEntity<List<Team>> searchTeams(@RequestParam String query) {
        Pageable page = PageRequest.of(0, 10);
        List<Team> result = teamService.searchTeams(query, page);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}