import {AgentService} from './agent.service';
import { AuthenticationService } from "./authentication.service";
import {UserService} from "./user.service"

export * from './agent.service';
export * from "./authentication.service"
export * from "./user.service"

export const services=[
    AgentService,
    AuthenticationService,
    UserService
]