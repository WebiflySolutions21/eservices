import {AgentService} from './agent.service';
import { AuthenticationService } from "./authentication.service";
import {UserService} from "./user.service"
import {LoginService} from "./login.service"
import {FormService} from "./form.service"
import {DataService} from "./data.service"
import {DropdownStateService} from "./dropdown-state.service"
import {RegistrationService} from "./registration.service"
import {PatientService} from "./patient.service"
export * from './agent.service';
export * from "./authentication.service"
export * from "./user.service"
export * from "./login.service"
export * from "./form.service"
export * from "./data.service"
export * from "./dropdown-state.service"
export * from "./registration.service"
export * from "./patient.service"


export const services=[
    AgentService,
    AuthenticationService,
    UserService,
    LoginService,
    FormService,
    DataService,
    DropdownStateService,
    RegistrationService,
    PatientService
]