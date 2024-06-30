package utils.springboot_server.Team;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
