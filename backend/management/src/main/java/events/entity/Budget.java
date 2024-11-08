package events.entity;

import events.enums.BudgetType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Budget {
	private String id;
	private String eventId;
	private String description;
	private Integer amount;
	private BudgetType type;
}
