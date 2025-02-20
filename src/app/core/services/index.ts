import {AgentService} from './agent.service';
import { AuthenticationService } from "./authentication.service";
import {UserService} from "./user.service"
import {LoginService} from "./login.service"
import {FormService} from "./form.service"

export * from './agent.service';
export * from "./authentication.service"
export * from "./user.service"
export * from "./login.service"
export * from "./form.service"


export const services=[
    AgentService,
    AuthenticationService,
    UserService,
    LoginService,
    FormService
]