package utils.springboot_server.Team;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, String> {

    @Query("SELECT t FROM Team t WHERE t.domesticCompetitionId = ?1")
    List<Team> findByChampionship(String championship);

    @Query("SELECT t FROM Team t WHERE t.lastSeason = 2023")
    List<Team> findByActive(boolean b);

    List<Team> findByNameContainingIgnoreCase(String query, Pageable page);
}
