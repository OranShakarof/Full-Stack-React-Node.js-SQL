import { Component } from "react";
import "./Clock.css";
import notifyService from "../../../Services/NotifyService";
import { time } from "console";

interface ClockProps {
	format: string; // "12hr" or "24hr"

}

interface ClockState {
	time: string;
}

// Class Component
class Clock extends Component<ClockProps, ClockState> {

    private timerId: number;

    public constructor(props: ClockProps) {
        super(props);
        this.state = { time: ""};
    }

    // useEffect performing once - when component is ready for use:
    public componentDidMount(): void {
         this.timerId = window.setInterval(() => {
            const now = new Date();
            const option = {hour12: this.props.format === "12h"};
            const time = now.toLocaleTimeString("en", option); // ...
            this.setState({time});
        },1000)
    }

    public componentWillUnmount(): void {
        window.clearInterval(this.timerId);
    }

    private displayTime = () => {
        notifyService.success(this.state.time);
    }

    public render(): JSX.Element {
        return (
            <div className="Clock">
				<span>{this.state.time} &nbsp; </span>
                {/* <button onClick={this.displayTime.bind(this)}>🕒</button> */}
                <button onClick={this.displayTime.bind(this)}>🕒</button>
            </div>
        );
    }
}

export default Clock;
