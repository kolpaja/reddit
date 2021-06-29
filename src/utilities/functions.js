import moment from "moment"

export function PostedTime(date) {
    date = moment(date);
    const now = moment();

    const minutes = parseInt(now.diff(date, "minutes"));
    const days = parseInt(now.diff(date, "days"));
    const months = parseInt(now.diff(date, "months"));


    if (months >= 12) {
        return `${Math.floor(months / 12)} year${months < 24 ? "" : "s"} ago`;
    } else {
        if (months < 12 && months > 0) {
            return `${months} month${months === 1 ? "" : "s"} ago`;
        } else {
            if (days >= 7 && days <= 31) {
                return `${Math.floor(days / 7)} week${days <= 13 ? "" : "s"} ago`;
            } else {
                if (days < 7 && days > 0) {
                    return `${days} day${days === 1 ? "" : "s"} ago`;
                } else if (minutes >= 60) {
                    return `${Math.floor(minutes / 60)} hour${minutes === 60 ? "" : "s"
                        } ago`;
                } else {
                    return `${minutes} minute ${minutes < 2 ? "" : "s"} ago`;
                }
            }
        }
    }
}


