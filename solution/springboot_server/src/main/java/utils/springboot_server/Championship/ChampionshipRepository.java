package utils.springboot_server.Championship;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChampionshipRepository extends JpaRepository<Championship, String>{

    @Query("SELECT c FROM Championship c WHERE c.subType = 'first_tier' ORDER BY c.name")
    List<Championship> findFirstTierChampionships();
}
