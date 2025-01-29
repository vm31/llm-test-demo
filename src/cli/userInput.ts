import readline from 'readline';

// Ask the user if they want to continue the session
export async function askUserToContinue(): Promise<string> {
    return await getUserInput('Do you want to continue? (yes/no): ');
}

// General function to get user input
export async function getUserInput(prompt: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(prompt, (answer: string) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}
