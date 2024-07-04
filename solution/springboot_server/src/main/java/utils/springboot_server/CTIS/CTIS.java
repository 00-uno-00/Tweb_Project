package utils.springboot_server.CTIS;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entity class representing the CTI (Calcio Trends Impact) Score.
 * Maps to the 'cti_score' table in the database.
 */
@Entity
@Table(name = "cti_score")
public class CTIS {
    @Id
    @Column(name = "player_id", nullable = false)
    private long id;

    @Column(name = "score", nullable = false)
    private long score;

    @Column(name = "year", nullable = false)
    private String year;

    // Getters and setters for each field
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getScore() {
        return score;
    }

    public void setScore(long score) {
        this.score = score;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
}