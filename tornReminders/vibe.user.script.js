// ==UserScript==
// @name         Torn Reminders: Vibe Edition (by Synth AAS)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Recurring reminders for Torn City with modern UI
// @author       YourName
// @match        https://www.torn.com/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
    "use strict";

    // Create CSS styles
    GM_addStyle(`
                /* Modern UI with Torn City color scheme */
                :root {
                    --torn-red: #e74c3c;
                    --torn-dark: #2c3e50;
                    --torn-blue: #3498db;
                    --torn-green: #2ecc71;
                    --torn-gray: #ecf0f1;
                    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    --radius: 8px;
                }

                .tr-container {
                    position: fixed;
                    top: 50%;
                    right: 20px;
                    transform: translateY(-50%);
                    width: 400px;
                    max-height: 90vh;
                    background: white;
                    border-radius: var(--radius);
                    box-shadow: var(--shadow);
                    overflow: hidden;
                    z-index: 9999;
                    display: none;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    color: #333;
                }

                .tr-header {
                    background: linear-gradient(135deg, var(--torn-dark), var(--torn-blue));
                    color: white;
                    padding: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .tr-title {
                    margin: 0;
                    font-size: 20px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .tr-logo {
                    font-size: 24px;
                }

                .tr-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 20px;
                    cursor: pointer;
                }

                .tr-content {
                    padding: 15px;
                    max-height: calc(90vh - 100px);
                    overflow-y: auto;
                }

                .tr-form-group {
                    margin-bottom: 15px;
                }

                .tr-label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: 600;
                    color: var(--torn-dark);
                }

                .tr-input, .tr-select, .tr-textarea {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: var(--radius);
                    font-size: 14px;
                }

                .tr-interval-fields {
                    display: flex;
                    gap: 10px;
                }

                .tr-interval-value {
                    flex: 1;
                }

                .tr-interval-unit {
                    flex: 2;
                }

                .tr-btn {
                    background: var(--torn-blue);
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    border-radius: var(--radius);
                    cursor: pointer;
                    font-weight: 600;
                    transition: background 0.3s;
                }

                .tr-btn:hover {
                    background: #2980b9;
                }

                .tr-btn-success {
                    background: var(--torn-green);
                }

                .tr-btn-success:hover {
                    background: #27ae60;
                }

                .tr-btn-danger {
                    background: var(--torn-red);
                }

                .tr-btn-danger:hover {
                    background: #c0392b;
                }

                .tr-actions {
                    display: flex;
                    gap: 10px;
                    margin-top: 15px;
                }

                .tr-reminders-list {
                    margin-top: 20px;
                }

                .tr-reminder-card {
                    background: var(--torn-gray);
                    border-radius: var(--radius);
                    padding: 12px;
                    margin-bottom: 12px;
                    border-left: 4px solid var(--torn-blue);
                }

                .tr-reminder-card.due {
                    border-left-color: var(--torn-red);
                    background: #fff9f9;
                    animation: tr-pulse 2s infinite;
                }

                @keyframes tr-pulse {
                    0% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(231, 76, 60, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0); }
                }

                .tr-reminder-title {
                    font-size: 16px;
                    font-weight: 600;
                    margin: 0 0 5px 0;
                }

                .tr-reminder-details {
                    color: #666;
                    display: flex;
                    gap: 10px;
                    margin-bottom: 8px;
                    font-size: 13px;
                }

                .tr-reminder-actions {
                    display: flex;
                    gap: 8px;
                    justify-content: flex-end;
                }

                .tr-badge {
                    background: var(--torn-blue);
                    color: white;
                    padding: 2px 6px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 600;
                }

                .tr-badge.due {
                    background: var(--torn-red);
                }

                .tr-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s;
                }

                .tr-modal-overlay.active {
                    opacity: 1;
                    pointer-events: all;
                }

                .tr-modal {
                    background: white;
                    border-radius: var(--radius);
                    width: 90%;
                    max-width: 500px;
                    box-shadow: var(--shadow);
                    transform: translateY(20px);
                    transition: transform 0.3s;
                }

                .tr-modal-overlay.active .tr-modal {
                    transform: translateY(0);
                }

                .tr-modal-header {
                    background: var(--torn-red);
                    color: white;
                    padding: 12px 15px;
                    border-top-left-radius: var(--radius);
                    border-top-right-radius: var(--radius);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .tr-modal-body {
                    padding: 15px;
                }

                .tr-modal-message {
                    font-size: 16px;
                    margin-bottom: 20px;
                    line-height: 1.4;
                }

                .tr-modal-actions {
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                }

                .tr-empty-state {
                    text-align: center;
                    padding: 30px 15px;
                    color: #777;
                }

                .tr-toggle-btn {
                    position: fixed;
                    top: 120px;
                    right: 0;
                    background: linear-gradient(135deg, var(--torn-dark), var(--torn-blue));
                    color: white;
                    border: none;
                    border-radius: 4px 0 0 4px;
                    padding: 10px 15px;
                    cursor: pointer;
                    z-index: 9998;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .tr-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--torn-green);
                    color: white;
                    padding: 12px 16px;
                    border-radius: var(--radius);
                    box-shadow: var(--shadow);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transform: translateX(120%);
                    transition: transform 0.3s;
                    z-index: 100;
                }

                .tr-notification.show {
                    transform: translateX(0);
                }
            `);

    // Create main container
    const container = document.createElement("div");
    container.className = "tr-container";
    container.id = "tr-container";
    container.innerHTML = `
                <div class="tr-header">
                    <h2 class="tr-title">
                        <span class="tr-logo">⏰</span>
                        Torn Reminders
                    </h2>
                    <button class="tr-close" id="tr-close">×</button>
                </div>
                <div class="tr-content">
                    <div class="tr-form-group">
                        <label class="tr-label" for="tr-reminder-title">Reminder Text</label>
                        <input type="text" class="tr-input" id="tr-reminder-title" placeholder="E.g., Collect energy, Attack cooldown">
                    </div>

                    <div class="tr-form-group">
                        <label class="tr-label" for="tr-reminder-details">Details (optional)</label>
                        <textarea class="tr-textarea" id="tr-reminder-details" rows="2" placeholder="Additional notes about this reminder"></textarea>
                    </div>

                    <div class="tr-form-group">
                        <label class="tr-label">Recurrence</label>
                        <div class="tr-interval-fields">
                            <div class="tr-interval-value">
                                <input type="number" class="tr-input" id="tr-interval-value" min="1" value="1">
                            </div>
                            <div class="tr-interval-unit">
                                <select class="tr-select" id="tr-interval-unit">
                                    <option value="minutes">Minutes</option>
                                    <option value="hours">Hours</option>
                                    <option value="days" selected>Days</option>
                                    <option value="weeks">Weeks</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="tr-actions">
                        <button class="tr-btn" id="tr-add-reminder">
                            Add Reminder
                        </button>
                    </div>

                    <div class="tr-reminders-list" id="tr-reminders-list"></div>
                </div>
            `;
    document.body.appendChild(container);

    // Create toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "tr-toggle-btn";
    toggleBtn.id = "tr-toggle-btn";
    toggleBtn.innerHTML = "⏰ Reminders";
    document.body.appendChild(toggleBtn);

    // Create notification element
    const notification = document.createElement("div");
    notification.className = "tr-notification";
    notification.id = "tr-notification";
    document.body.appendChild(notification);

    // Create alert modal
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "tr-modal-overlay";
    modalOverlay.id = "tr-alert-modal";
    modalOverlay.innerHTML = `
                <div class="tr-modal">
                    <div class="tr-modal-header">
                        <i>⏰</i>
                        <h2>Reminder!</h2>
                    </div>
                    <div class="tr-modal-body">
                        <p class="tr-modal-message" id="tr-alert-message">It's time to collect your energy!</p>
                        <div class="tr-modal-actions">
                            <button class="tr-btn tr-btn-success" id="tr-done-btn">Done</button>
                            <button class="tr-btn" id="tr-next-time-btn">Next Time</button>
                            <button class="tr-btn tr-btn-danger" id="tr-snooze-btn">Snooze (1h)</button>
                        </div>
                    </div>
                </div>
            `;
    document.body.appendChild(modalOverlay);

    // Reminder management system
    class ReminderManager {
        constructor() {
            this.reminders = GM_getValue("tornReminders", []);
            this.currentId = GM_getValue("currentReminderId", 1);
            this.initEventListeners();
            this.renderReminders();
            this.checkDueReminders();
        }

        initEventListeners() {
            // Toggle panel
            document
                .getElementById("tr-toggle-btn")
                .addEventListener("click", () => {
                    document.getElementById("tr-container").style.display =
                        "block";
                });

            // Close panel
            document
                .getElementById("tr-close")
                .addEventListener("click", () => {
                    document.getElementById("tr-container").style.display =
                        "none";
                });

            // Add new reminder
            document
                .getElementById("tr-add-reminder")
                .addEventListener("click", () => this.addReminder());

            // Alert modal buttons
            document
                .getElementById("tr-done-btn")
                .addEventListener("click", () => this.handleDone());
            document
                .getElementById("tr-next-time-btn")
                .addEventListener("click", () => this.handleNextTime());
            document
                .getElementById("tr-snooze-btn")
                .addEventListener("click", () => this.handleSnooze());
        }

        addReminder() {
            const titleInput = document.getElementById("tr-reminder-title");
            const detailsInput = document.getElementById("tr-reminder-details");
            const intervalValue =
                document.getElementById("tr-interval-value").value;
            const intervalUnit =
                document.getElementById("tr-interval-unit").value;

            if (!titleInput.value.trim()) {
                this.showNotification("Reminder title is required!", "error");
                return;
            }

            const newReminder = {
                id: this.currentId++,
                title: titleInput.value,
                details: detailsInput.value,
                interval: {
                    value: parseInt(intervalValue),
                    unit: intervalUnit,
                },
                nextTime: this.calculateNextTime(
                    parseInt(intervalValue),
                    intervalUnit
                ),
                createdAt: new Date().toISOString(),
                completed: false,
            };

            this.reminders.push(newReminder);
            this.saveReminders();
            this.renderReminders();
            this.showNotification("Reminder added successfully!");

            // Reset form
            titleInput.value = "";
            detailsInput.value = "";
            document.getElementById("tr-interval-value").value = "1";
            document.getElementById("tr-interval-unit").value = "days";
        }

        calculateNextTime(value, unit) {
            const now = Date.now();
            switch (unit) {
                case "minutes":
                    return now + value * 60000;
                case "hours":
                    return now + value * 3600000;
                case "days":
                    return now + value * 86400000;
                case "weeks":
                    return now + value * 604800000;
                default:
                    return now + value * 60000;
            }
        }

        saveReminders() {
            GM_setValue("tornReminders", this.reminders);
            GM_setValue("currentReminderId", this.currentId);
        }

        renderReminders() {
            const container = document.getElementById("tr-reminders-list");
            container.innerHTML = "";

            const activeReminders = this.reminders.filter((r) => !r.completed);

            if (activeReminders.length === 0) {
                container.innerHTML = `
                            <div class="tr-empty-state">
                                <i>⏰</i>
                                <h3>No Active Reminders</h3>
                                <p>Add a reminder to get started</p>
                            </div>
                        `;
                return;
            }

            activeReminders.forEach((reminder) => {
                const due = reminder.nextTime <= Date.now();
                const nextIn = this.formatTimeDifference(reminder.nextTime);

                const card = document.createElement("div");
                card.className = `tr-reminder-card ${due ? "due" : ""}`;
                card.innerHTML = `
                            <h3 class="tr-reminder-title">${reminder.title}</h3>
                            <div class="tr-reminder-details">
                                <span>Every <strong>${
                                    reminder.interval.value
                                } ${reminder.interval.unit}</strong></span>
                                <span>Next: <strong>${nextIn}</strong></span>
                            </div>
                            <div class="tr-reminder-actions">
                                ${
                                    due
                                        ? '<span class="tr-badge due">DUE</span>'
                                        : ""
                                }
                                <button class="tr-btn" data-action="snooze" data-id="${
                                    reminder.id
                                }">Snooze</button>
                                <button class="tr-btn tr-btn-danger" data-action="delete" data-id="${
                                    reminder.id
                                }">Delete</button>
                            </div>
                        `;

                container.appendChild(card);
            });

            // Add event listeners to action buttons
            container
                .querySelectorAll('[data-action="snooze"]')
                .forEach((btn) => {
                    btn.addEventListener("click", (e) => {
                        const id = parseInt(e.target.dataset.id);
                        this.snoozeReminder(id);
                    });
                });

            container
                .querySelectorAll('[data-action="delete"]')
                .forEach((btn) => {
                    btn.addEventListener("click", (e) => {
                        const id = parseInt(e.target.dataset.id);
                        this.deleteReminder(id);
                    });
                });
        }

        formatTimeDifference(timestamp) {
            const now = Date.now();
            const diff = timestamp - now;

            if (diff <= 0) return "NOW";

            const minutes = Math.floor(diff / 60000);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (days > 0) return `in ${days} day${days > 1 ? "s" : ""}`;
            if (hours > 0) return `in ${hours} hour${hours > 1 ? "s" : ""}`;
            return `in ${minutes} minute${minutes > 1 ? "s" : ""}`;
        }

        checkDueReminders() {
            setInterval(() => {
                const now = Date.now();
                const dueReminders = this.reminders.filter(
                    (r) => !r.completed && r.nextTime <= now
                );

                if (dueReminders.length > 0) {
                    dueReminders.forEach((reminder) =>
                        this.showAlert(reminder)
                    );
                }
            }, 60000); // Check every minute
        }

        showAlert(reminder) {
            const modal = document.getElementById("tr-alert-modal");
            const message = document.getElementById("tr-alert-message");

            message.textContent = reminder.details
                ? `${reminder.title}: ${reminder.details}`
                : reminder.title;

            modal.classList.add("active");
            this.currentAlert = reminder;
        }

        handleDone() {
            if (!this.currentAlert) return;

            // Reschedule the reminder
            const reminder = this.reminders.find(
                (r) => r.id === this.currentAlert.id
            );
            if (reminder) {
                reminder.nextTime = this.calculateNextTime(
                    reminder.interval.value,
                    reminder.interval.unit
                );
                this.saveReminders();
                this.renderReminders();
            }

            this.closeAlert();
        }

        handleNextTime() {
            // Simply close the alert without rescheduling
            this.closeAlert();
        }

        handleSnooze() {
            if (!this.currentAlert) return;

            const reminder = this.reminders.find(
                (r) => r.id === this.currentAlert.id
            );
            if (reminder) {
                // Snooze for 1 hour
                reminder.nextTime = Date.now() + 3600000;
                this.saveReminders();
                this.renderReminders();
            }

            this.closeAlert();
        }

        closeAlert() {
            const modal = document.getElementById("tr-alert-modal");
            modal.classList.remove("active");
            this.currentAlert = null;
        }

        snoozeReminder(id) {
            const reminder = this.reminders.find((r) => r.id === id);
            if (reminder) {
                reminder.nextTime = Date.now() + 3600000; // 1 hour
                this.saveReminders();
                this.renderReminders();
                this.showNotification("Reminder snoozed for 1 hour");
            }
        }

        deleteReminder(id) {
            this.reminders = this.reminders.filter((r) => r.id !== id);
            this.saveReminders();
            this.renderReminders();
            this.showNotification("Reminder deleted");
        }

        showNotification(message, type = "success") {
            const notification = document.getElementById("tr-notification");
            notification.textContent = message;
            notification.className = `tr-notification show ${type}`;

            setTimeout(() => {
                notification.className = "tr-notification";
            }, 3000);
        }
    }

    // Initialize the reminder manager when the page loads
    window.addEventListener("load", () => {
        const reminderManager = new ReminderManager();

        // Add menu command to open the panel
        GM_registerMenuCommand("Open Reminders", function () {
            document.getElementById("tr-container").style.display = "block";
        });
    });
})();
