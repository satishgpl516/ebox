import axios from "axios";
import {history} from "../App";
import {ROOT_URL, USER, apiHeader, PAYMENT} from "../constants";
import swal from 'sweetalert';

axios.defaults.withCredentials = true;

