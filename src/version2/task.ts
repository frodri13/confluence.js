import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class Task {
  constructor(private client: Client) {}

  /**
   * Returns all tasks. The number of results is limited by the `limit` parameter and additional results (if available)
   * will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only tasks that the user has permission to view will be returned.
   */
  async getTasks<T = Models.Pagination<Models.Task>>(
    parameters: Parameters.GetTasks | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all tasks. The number of results is limited by the `limit` parameter and additional results (if available)
   * will be available through the `next` URL present in the `Link` response header.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission). Only tasks that the user has permission to view will be returned.
   */
  async getTasks<T = Models.Pagination<Models.Task>>(parameters?: Parameters.GetTasks, callback?: never): Promise<T>;
  async getTasks<T = Models.Pagination<Models.Task>>(
    parameters?: Parameters.GetTasks,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/tasks',
      method: 'GET',
      params: {
        'body-format': parameters?.['body-format'],
        'include-blank-tasks': parameters?.['include-blank-tasks'],
        status: parameters?.status,
        'task-id': parameters?.taskId,
        'space-id': parameters?.spaceId,
        'page-id': parameters?.pageId,
        'blogpost-id': parameters?.['blogpost-id'],
        'created-by': parameters?.['created-by'],
        'assigned-to': parameters?.['assigned-to'],
        'completed-by': parameters?.['completed-by'],
        'created-at-from': parameters?.['created-at-from'],
        'created-at-to': parameters?.['created-at-to'],
        'due-at-from': parameters?.['due-at-from'],
        'due-at-to': parameters?.['due-at-to'],
        'completed-at-from': parameters?.['completed-at-from'],
        'completed-at-to': parameters?.['completed-at-to'],
        cursor: parameters?.cursor,
        limit: parameters?.limit,
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a specific task.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the containing page or
   * blog post and its corresponding space.
   */
  async getTaskById<T = Models.Task>(parameters: Parameters.GetTaskById, callback: Callback<T>): Promise<void>;
  /**
   * Returns a specific task.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the containing page or
   * blog post and its corresponding space.
   */
  async getTaskById<T = Models.Task>(parameters: Parameters.GetTaskById, callback?: never): Promise<T>;
  async getTaskById<T = Models.Task>(parameters: Parameters.GetTaskById, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/tasks/${parameters.id}`,
      method: 'GET',
      params: {
        'body-format': parameters['body-format'],
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Update a task by id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the containing page or
   * blog post and view its corresponding space.
   */
  async updateTask<T = Models.Task>(parameters: Parameters.UpdateTask, callback: Callback<T>): Promise<void>;
  /**
   * Update a task by id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the containing page or
   * blog post and view its corresponding space.
   */
  async updateTask<T = Models.Task>(parameters: Parameters.UpdateTask, callback?: never): Promise<T>;
  async updateTask<T = Models.Task>(parameters: Parameters.UpdateTask, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/tasks/${parameters.id}`,
      method: 'PUT',
      params: {
        'serialize-ids-as-strings': true,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
