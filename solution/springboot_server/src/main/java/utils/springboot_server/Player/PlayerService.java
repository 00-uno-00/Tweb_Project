package utils.springboot_server.Player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for player-related operations.
 * Provides methods to interact with the PlayerRepository for CRUD operations and custom queries.
 */
@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    /**
     * Constructs a PlayerService with dependency injection for the PlayerRepository.
     * @param playerRepository The repository used for player operations.
     */
    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    /**
     * Retrieves a list of players associated with a specific club ID.
     * @param currentClubId The ID of the club.
     * @return A list of players belonging to the specified club.
     */
    public List<Player> getPlayersByCurrentClubId(long currentClubId) {
        return playerRepository.findByCurrentClubId(currentClubId);
    }

    /**
     * Retrieves a player by their name.
     * @param name The name of the player.
     * @return The player with the specified name.
     */
    public Player getPlayerByName(String name) {
        return playerRepository.findByName(name);
    }

    /**
     * Retrieves a player by their ID.
     * @param id The ID of the player.
     * @return The player with the specified ID.
     */
    public Player getPlayerById(long id) {
        return playerRepository.findById(id);
    }

    /**
     * Saves a list of players to the database.
     * @param players The list of players to be saved.
     * @return The list of saved players.
     */
    public List<Player> savePlayers(List<Player> players) {
        return playerRepository.saveAll(players);
    }

    /**
     * Retrieves the total score of a club based on its ID.
     * @param currentClubId The ID of the club.
     * @return The total score of the club.
     */
    public Float getCurrentClubScore(long currentClubId) {
        return playerRepository.getCurrentClubScore(currentClubId);
    }

    /**
     * Retrieves a list of players by their IDs.
     * @param ids The list of player IDs.
     * @return A list of players with the specified IDs.
     */
    public List<Player> getPlayersByIds(List<Long> ids) {
        return playerRepository.findAllById(ids);
    }

    /**
     * Searches for players based on a name query.
     * @param name The query string used for searching.
     * @param pageable Pagination information.
     * @return A list of players whose names contain the query string.
     */
    public List<Player> searchPlayers(String name, Pageable pageable) {
        return playerRepository.findByNameContainingIgnoreCase(name, pageable);
    }

    /**
     * Retrieves the total number of players in the database.
     * @return The total number of players.
     */
    public Long getNumberOfPlayers() {
        return playerRepository.count();
    }
}