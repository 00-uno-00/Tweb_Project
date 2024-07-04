package utils.springboot_server.Team;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {
    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public Team getTeamById(String id) {
        return teamRepository.findById(id).orElse(null);
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll(Sort.by("name"));
    }

    public List<Team> getTeamsByChampionship(String championship) {
        return teamRepository.findByChampionship(championship);
    }

    public List<Team> getActiveTeams() {
        return teamRepository.findByActive(true);
    }

    public List<Team> searchTeams(String query, Pageable page) {
        return teamRepository.findByNameContainingIgnoreCase(query, page);
    }

    public Long getNumberOfTeams() {
        return teamRepository.count();
    }
}