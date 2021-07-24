/*
export const Delay = async (ms: number) => new Promise(res => setTimeout(res, ms))*/

export const Delay = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms));
