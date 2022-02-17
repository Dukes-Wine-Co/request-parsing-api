import UAParser from "ua-parser-js";

export default interface UserAgentType {
    ua?: UAParser;
    browserName?: string;
    browserVersion?: string;
    browserMajor?: string;
    engineName?: string;
    engineVersion?: string;
    engineMajor?: string;
    osName?: string;
    osVersion?: string;
    osMajor?: string;
    deviceName?: string;
    deviceVersion?: string;
    deviceMajor?: string;
    cpuName?: string;
    cpuVersion?: string;
    cpuMajor?: string;
}