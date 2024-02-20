import { ApiProperty } from "@nestjs/swagger";

export class LoginRequest {
	@ApiProperty({
		description: 'user email',
	})
	email: string;

	@ApiProperty({
		description: 'user password',
	})
	password: string;
}