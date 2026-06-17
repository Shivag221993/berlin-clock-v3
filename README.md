The Berlin Clock (Mengenlehreclock or Berlin Uhr) is a clock that tells the time using a series of illuminated coloured blocks, as you can see in the picture for this project.

The top lamp blinks to show seconds- it is illuminated on even seconds and off on odd seconds.

The next two rows represent hours. The upper row represents 5 hour blocks and is made up of 4 red lamps. The lower row represents 1 hour blocks and is also made up of 4 red lamps.

The final two rows represent the minutes. The upper row represents 5 minute blocks, and is made up of 11 lamps- every third lamp is red, the rest are yellow. The bottom row represents 1 minute blocks, and is made up of 4 yellow lamps.

# Berlin Clock (Mengenlehreclock)

A React application built with Vite, TypeScript, and a strict Test-Driven Development (TDD) approach. This app visualizes time using the classic Berlin Clock logic, displaying a rolling live system time with the option to switch to a custom time input framework.

---

## Tech Stack & Tooling Versions

The main tools and dependencies utilized in this project include:

| Tool / Library            | Version   | Category    | Description                                |
| :------------------------ | :-------- | :---------- | :----------------------------------------- |
| **React**                 | `^19.2.6` | Runtime     | Core UI library                            |
| **React DOM**             | `^19.2.6` | Runtime     | Render engine for the browser DOM          |
| **TypeScript**            | `~6.0.2`  | Development | Static type checking                       |
| **Vite**                  | `^8.0.12` | Development | Next-generation frontend tooling & bundler |
| **Vitest**                | `^4.1.8`  | Testing     | Fast, native test runner                   |
| **React Testing Library** | `^16.3.2` | Testing     | UI component testing utilities             |
| **Jest DOM**              | `^6.9.1`  | Testing     | Custom DOM matchers (`toBeInTheDocument`)  |
| **JSDOM**                 | `^28.1.0` | Testing     | Browser environment simulation for node    |
| **ESLint**                | `^10.3.0` | Linting     | Code quality and static analysis tool      |

---

1. Real-Time Tracking Mode (Default)
   Upon launching, the clock initializes using your local system time.

Top Round Lamp: Blinks continuously on every change of second (Illuminated on even seconds, dark on odd seconds).

Row 1 (Red): Represents 5-hour blocks.

Row 2 (Red): Represents 1-hour blocks.

Row 3 (Yellow/Red): Represents 5-minute blocks (Every 3rd lamp illuminates Red to mark the 15, 30, and 45-minute quarters).

Row 4 (Yellow): Represents 1-minute blocks.

2. Custom Time Overrides
   Scroll below the digital display block to locate the Controls section.

Click the checkbox labeled "Enable Custom Time".

This halts the automated interval ticking engine and opens a manual override input field.

Type any standard target timestamp sequence using the HH:mm:ss syntax format (e.g., 23:37:00 or 15:15:00).

The rows of colored blocks will instantly recompute their structural patterns to visually show your custom input time!

Uncheck the box at any time to seamlessly transition back to the current live clock.
