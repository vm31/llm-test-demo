import { writeFile, readFile } from 'fs/promises';
import * as fs from 'fs';

interface Session {
    requirementPath?: string;
    outputFilePath?: string;
    customPrompt?: string;
}

const SESSION_FILE_PATH = 'session.json';

let session: Session = {}; // Use the defined interface

export function updateSession(updatedData: Partial<Session>): void {
    session = { ...session, ...updatedData };
}

export async function saveSession(): Promise<void> {
    try {
        await writeFile(SESSION_FILE_PATH, JSON.stringify(session, null, 2), 'utf-8'); // Pretty print for readability
        console.log('Session saved.');
    } catch (error) {
        console.error('Error saving session:', error);
    }
}

export async function loadSession(): Promise<void> {
    try {
        if (fs.existsSync(SESSION_FILE_PATH)) {
            const data = await readFile(SESSION_FILE_PATH, 'utf-8');
            session = JSON.parse(data);
            console.log('Session loaded.');
        }
    } catch (error) {
        console.error('Error loading session:', error);
    }
}

export function getSession(): Session {
    return session;
}
