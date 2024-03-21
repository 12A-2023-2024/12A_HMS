export class Utils{
    // I planned to use this but I found a better way lol
    // I'll leave this here in case anybody needs it
    static primeFactors(n: number): number[] {
        if (!Number.isSafeInteger(n)) {
            throw new Error(`'n' must be a safe integer, got '${n}'`)
        }
        if (n < 0) {
            throw new Error("'n' must be at least 0");
        }
        if (n < 2) {
            return []
        }
        let suspectedFactors = [...Array(n+1).keys()];
        suspectedFactors[1] = 1
        for (let i = 2; i < n+1; i++) {
            suspectedFactors[i] = i;
        }
        for (let i = 4; i < n+1; i+=2) {
            suspectedFactors[i] = 2
        }
        let end = Math.sqrt(n)+1
        for (let i = 3; i < end; i++) {
            if (suspectedFactors[i] == i) {
                for (let j = i*i; j < n+1; j+=i) {
                    if (suspectedFactors[j] == j) {
                        suspectedFactors[j] = i;
                    }
                }
            }
            
        }
        let factors: number[] = []
        while (n != 1) {
            factors.push(suspectedFactors[n])
            n = Math.floor(n / suspectedFactors[n])
        }
        return factors
    }
}