package events.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetDto {
	private BudgetDetailsDto[] income;
	private BudgetDetailsDto[] expense;
}
