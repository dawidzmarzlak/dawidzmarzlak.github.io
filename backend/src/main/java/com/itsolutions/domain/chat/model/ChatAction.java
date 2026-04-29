package com.itsolutions.domain.chat.model;

/**
 * Suggested actions based on conversation context.
 */
public enum ChatAction {
    /**
     * Collect lead information from the user.
     */
    COLLECT_LEAD,

    /**
     * Redirect user to contact form.
     */
    REDIRECT_CONTACT,

    /**
     * Redirect user to quote/pricing form.
     */
    REDIRECT_QUOTE
}
