import {
  type Message,
  type InsertMessage,
  type User,
  type InsertUser,
  type Skill,
  type InsertSkill,
  type Project,
  type InsertProject,
  type About,
  type InsertAbout,
} from "@shared/schema";

export interface IStorage {
  // Messages
  getMessage(id: number): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;

  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Skills
  getSkills(): Promise<Skill[]>;
  getSkill(id: number): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill>;
  deleteSkill(id: number): Promise<void>;

  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;

  // About
  getAbout(): Promise<About | undefined>;
  updateAbout(about: InsertAbout): Promise<About>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Map<number, Message>;
  private skills: Map<number, Skill>;
  private projects: Map<number, Project>;
  private about: About | undefined;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.skills = new Map();
    this.projects = new Map();
    this.currentId = 1;
  }

  // Messages
  async getMessage(id: number): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentId++;
    const message: Message = { ...insertMessage, id };
    this.messages.set(id, message);
    return message;
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id, isAdmin: false };
    this.users.set(id, user);
    return user;
  }

  // Skills
  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async getSkill(id: number): Promise<Skill | undefined> {
    return this.skills.get(id);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = this.currentId++;
    const skill: Skill = { ...insertSkill, id, createdAt: new Date() };
    this.skills.set(id, skill);
    return skill;
  }

  async updateSkill(
    id: number,
    updateData: Partial<InsertSkill>
  ): Promise<Skill> {
    const skill = this.skills.get(id);
    if (!skill) throw new Error("Skill not found");

    const updatedSkill = { ...skill, ...updateData };
    this.skills.set(id, updatedSkill);
    return updatedSkill;
  }

  async deleteSkill(id: number): Promise<void> {
    this.skills.delete(id);
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentId++;
    const project: Project = { ...insertProject, id, createdAt: new Date() };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(
    id: number,
    updateData: Partial<InsertProject>
  ): Promise<Project> {
    const project = this.projects.get(id);
    if (!project) throw new Error("Project not found");

    const updatedProject = { ...project, ...updateData };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<void> {
    this.projects.delete(id);
  }

  // About
  async getAbout(): Promise<About | undefined> {
    return this.about;
  }

  async updateAbout(insertAbout: InsertAbout): Promise<About> {
    const id = 1; // Single about record
    this.about = { ...insertAbout, id, updatedAt: new Date() };
    return this.about;
  }
}

export const storage = new MemStorage();
