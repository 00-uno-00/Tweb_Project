package utils.springboot_server.Player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getPlayersByCurrentClubId(long currentClubId) {
        return playerRepository.findByCurrentClubId(currentClubId);
    }

    public Player getPlayerByName(String name) {
        return playerRepository.findByName(name);
    }

    public Player getPlayerById(long id) {
        return playerRepository.findById(id);
    }

    public List<Player> savePlayers(List<Player> players) {return playerRepository.saveAll(players);}

    public Float getCurrentClubScore(long currentClubId) {
        return playerRepository.getCurrentClubScore(currentClubId);
    }

    public List<Player> getPlayersByIds(List<Long> ids) {return playerRepository.findAllById(ids);}

    public List<Player> searchPlayers(String name, Pageable pageable) {
        return playerRepository.findByNameContainingIgnoreCase(name, pageable);
    }
}
