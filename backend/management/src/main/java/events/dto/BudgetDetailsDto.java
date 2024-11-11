package events.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetDetailsDto {
	private String budgetId;
	private String description;
	private Integer amount;
}
