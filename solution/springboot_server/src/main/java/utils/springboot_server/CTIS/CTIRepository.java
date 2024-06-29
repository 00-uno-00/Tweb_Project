package utils.springboot_server.CTIS;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CTIRepository extends JpaRepository<CTIS, Long> {

    @Query(value = "SELECT score FROM cti_score WHERE player_id = :id", nativeQuery = true)
    Integer findScoreById(long id);

    @Query(value = "SELECT * FROM cti_score WHERE player_id IN :playerIds", nativeQuery = true)
    List<Integer> findScoreByList(List<Long> playerIds);

    @Query(value = "SELECT * FROM cti_score ORDER BY score DESC LIMIT 15", nativeQuery = true)
    List<CTIS> findTop15();
}
