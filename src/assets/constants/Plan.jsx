class Plan {
	constructor(name, work, short, long, max, isSelected=true) {
		this.name = name;
		this.max = max;

		this.work = work;
		this.short = short;
		this.long = long;
		
		this.isSelected = isSelected;
		this.isSure = true;
	}

	//Getters
	get getName() { return this.name; }
	get getWorkDuration() { return this.work; }
	get getShortBreakDuration() { return this.short; }
	get getLongBreakDuration() { return this.long; }
	get getMaxSessions() { return this.max; }
	get getIsSelected() { return this.isSelected; }
	
	//Methods
	setDuration(name, value) {
		const new_value = parseInt(value) > 0 ? parseInt(value) : "";

		switch((name)) {
            case "work":
                this.work = new_value;
                break;
            case "short":
                this.short = new_value;
                break;
            case "long":
                this.long = new_value;
                break;
            default:
                console.log("Error: Invalid name");
        }

		this.isSure = false;
		return this;
	}

	setMax(value) {
		this.max = parseInt(value) > 0 ? parseInt(value) : "";
		return this;
	}

	setSure() {
		this.isSure = true;
		return this;
	}

	setName(value) {
		this.name = value;
		return this;
	}

	toggleSelected() {
		this.isSelected = !this.isSelected;
		return this;
	}

	turnSelectedOn() {
		this.isSelected = true;
		return this;
	}

	static parseObject(obj) {
		return new Plan(
			obj.name,
			obj.work,
			obj.short,
			obj.long,
			obj.max,
			obj.isSelected
		)
	}
}

const standardPlan = new Plan("standard", 25, 5, 30, 4, true);
const recommendedPlan = new Plan("recommended", 52, 17, 30, 2, true);

const basePlan = new Plan("default", 25, 5, 30, 4);
const testPlan = new Plan("default", 0.1, 0.2, 0.3, 5);
const fastPlan = new Plan("default", 0.03, 0.05, 0.07, 3);


export { Plan, standardPlan, recommendedPlan }
export default fastPlan;