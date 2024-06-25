package utils.springboot_server.CTIS;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CTIRepository extends JpaRepository<CTIS, Long> {

    @Query(value = "SELECT * FROM cti_score WHERE player_id = :id", nativeQuery = true)
    Integer findScoreById(long id);
}
