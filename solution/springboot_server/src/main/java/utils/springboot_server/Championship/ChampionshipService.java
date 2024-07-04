package utils.springboot_server.Championship;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for managing championship operations.
 * This class provides methods to perform CRUD operations and custom queries on championships.
 */
@Service
public class ChampionshipService {

    @Autowired
    private ChampionshipRepository championshipRepository;

    /**
     * Retrieves a championship by its ID.
     * @param id The ID of the championship to retrieve.
     * @return The found Championship or null if not found.
     */
    public Championship getChampionshipById(String id) {
        return championshipRepository.findById(id).orElse(null);
    }

    /**
     * Adds a new championship to the repository.
     * @param championship The Championship object to add.
     * @return The saved Championship object.
     */
    public Championship addChampionship(Championship championship) {
        return championshipRepository.save(championship);
    }

    /**
     * Deletes a championship by its ID.(POC)
     * @param id The ID of the championship to delete.
     */
    public void deleteChampionship(String id) {
        championshipRepository.deleteById(id);
    }

    /**
     * Retrieves all first-tier championships.
     * @return A list of first-tier Championships.
     */
    public List<Championship> getFirstTierChampionships() {
        return championshipRepository.findFirstTierChampionships();
    }

    /**
     * Searches for championships by name containing the given query string, ignoring case.
     * @param query The query string to search for within the championship name.
     * @param page Pageable object to support pagination.
     * @return A list of Championships whose names contain the given query string.
     */
    public List<Championship> searchChamp(String query, Pageable page) {
        return championshipRepository.findByNameContainingIgnoreCase(query, page);
    }

    /**
     * Retrieves all championships, sorted by name.
     * @return A list of all Championships, sorted by name.
     */
    public List<Championship> getChampionships() {
        return championshipRepository.findAll(Sort.by("name"));
    }

    /**
     * Retrieves a championship by its exact name.
     * @param name The exact name of the championship to retrieve.
     * @return The found Championship or null if not found.
     */
    public Championship getChampionshipByName(String name) {
        return championshipRepository.findByName(name);
    }

    /**
     * Retrieves the total number of championships.
     * @return The total number of Championships.
     */
    public Long getNumberOfChampionships() {
        return championshipRepository.count();
    }
}