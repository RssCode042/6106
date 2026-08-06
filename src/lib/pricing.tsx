export const getEnvNumber = (val: string | undefined, fallback: number) => {
    if (val !== undefined && val !== '' && !isNaN(parseFloat(val))) {
        return parseFloat(val);
    }
    return fallback;
};

export const TARIFFS = {
    INTERCITY_EUR: getEnvNumber(import.meta.env.VITE_INTERCITY_PRICE_PER_KM_EUR, 0.51),
    DAY_KM_EUR: getEnvNumber(import.meta.env.VITE_DAY_PRICE_PER_KM_EUR, 0.85),
    DAY_INITIAL_EUR: getEnvNumber(import.meta.env.VITE_DAY_INITIAL_FEE_EUR, 1.85),
    DAY_WAIT_EUR: getEnvNumber(import.meta.env.VITE_DAY_WAIT_FEE_EUR, 0.25),
    NIGHT_KM_EUR: getEnvNumber(import.meta.env.VITE_NIGHT_PRICE_PER_KM_EUR, 0.95),
    NIGHT_INITIAL_EUR: getEnvNumber(import.meta.env.VITE_NIGHT_INITIAL_FEE_EUR, 1.95),
    NIGHT_WAIT_EUR: getEnvNumber(import.meta.env.VITE_NIGHT_WAIT_FEE_EUR, 0.30),
    EUR_TO_BGN: getEnvNumber(import.meta.env.VITE_EUR_TO_BGN_RATE, 1.95583),
};