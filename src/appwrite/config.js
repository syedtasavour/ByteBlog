import conf from "../conf/conf";
import { Client, Account, Databases, ID, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  Databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)v
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async deletePost(slug, { title, content, featuredImage, status }) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true
    } catch (error) {
      return false
    }
  }
}

const service = new Service({});

export default service;
