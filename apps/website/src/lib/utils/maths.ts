export function map(value: number, min1: number, max1: number, min2: number, max2: number) {
	if (min1 === max1 || isNaN(value)) return min1 // No dividing by zero allowed
	return ((value - min1) / (max1 - min1)) * (max2 - min2) + min2
}
