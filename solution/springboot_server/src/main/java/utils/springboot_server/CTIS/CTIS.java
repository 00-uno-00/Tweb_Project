package utils.springboot_server.CTIS;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

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
}
