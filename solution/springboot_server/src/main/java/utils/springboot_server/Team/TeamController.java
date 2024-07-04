package utils.springboot_server.Team;


import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utils.springboot_server.Player.Player;

import java.util.List;

@RestController
@RequestMapping("/Team")
public class TeamController {
    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping("/getTeamById/{id}")
    public Team getTeamById(@PathVariable String id) {
        return teamService.getTeamById(id);
    }

    @GetMapping("/getAllTeams")
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }

    @GetMapping("/getTeamsByChampionship/{championship}")
    public List<Team> getTeamsByChampionship(@PathVariable String championship) {
        return teamService.getTeamsByChampionship(championship);
    }

    @GetMapping("/getActiveTeams")
    public List<Team> getActiveTeams() {
        return teamService.getActiveTeams();
    }

    @GetMapping("/getNumberOfTeams")
    public Long getNumberOfTeams() {
        return teamService.getNumberOfTeams();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Team>> searchTeams(@RequestParam String query) {
        Pageable page = PageRequest.of(0, 10);
        List<Team> result = teamService.searchTeams(query, page);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
