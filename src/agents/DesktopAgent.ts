import { AbstractAgent } from '@push/agents';
import { Util } from '@push/core';

/**
 * Notification agent for modern desktop browsers:
 * Safari 6+, Firefox 22+, Chrome 22+, Opera 25+
 */
export default class DesktopAgent extends AbstractAgent {
  /**
   * Returns a boolean denoting support
   * @returns {Boolean} boolean denoting whether webkit notifications are supported
   */
  isSupported() {
    return this.win.Notification !== undefined;
  }

  /**
   * Creates a new notification
   * @param title - notification title
   * @param options - notification options array
   * @returns {Notification}
   */
  create(title: string, options: PushOptions): Notification | null {
      if (this.win.Notification) {
          const notificationClass: any = this.win.Notification;
          return new notificationClass(title, {
              icon:
                  Util.isString(options.icon) || Util.isUndefined(options.icon)
                      ? options.icon
                      : options.icon.x32,
              body: options.body,
              tag: options.tag,
              requireInteraction: options.requireInteraction
          });
      }

      return null;
  }

  /**
   * Close a given notification
   * @param notification - notification to close
   */
  close(notification: GenericNotification) {
    notification.close();
  }
}
