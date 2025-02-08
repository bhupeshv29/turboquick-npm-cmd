#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { simpleGit } from "simple-git";
import ora from "ora";
import inquirer from "inquirer";
import { execSync } from "child_process";

const program = new Command();

program
  .version("1.0.0")
  .action(async () => {
    // Prompt user for project name
    const { projectName } = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "Enter your project name:",
        validate: (input) => input ? true : "Project name cannot be empty."
      }
    ]);

    const projectPath = path.join(process.cwd(), projectName);

    // Check if directory already exists
    if (fs.existsSync(projectPath)) {
      console.error(chalk.red(`Error: Directory "${projectName}" already exists.`));
      process.exit(1);
    }

    // Repository URL
    const repoUrl = "https://github.com/bhupeshv29/turboquick-app-starter.git";

    // Create the project directory
    fs.mkdirSync(projectPath);

    // Spinner for visual feedback
    const spinner = ora("Cloning Turbo Starter template...").start();
    const git = simpleGit();

    try {
      // Clone the repository
      await git.clone(repoUrl, projectPath);
      spinner.succeed("Template cloned successfully!");

      // Navigate to the project directory
      process.chdir(projectPath);

      // Remove .git folder to avoid conflicts
      fs.removeSync(path.join(projectPath, ".git"));

      // Install dependencies using pnpm
      spinner.start("Installing dependencies with pnpm...");
      execSync("pnpm install", { stdio: "inherit" });
      spinner.succeed("Dependencies installed successfully!");

      console.log(chalk.green(`\nProject "${projectName}" is ready! 🚀`));
      console.log(chalk.green(`cd ${projectName} && pnpm run dev`));
    } catch (error) {
      spinner.fail("Failed to set up the project.");
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  });

program.parse(process.argv);