import React, { useState } from 'react';
import { Mail, Copy, Check, Send, ArrowUpRight, Loader2, AlertCircle, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon, CodeforcesIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        companyUrl: '', // Honeypot field for bot defense
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(personalInfo.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);

        try {
            const apiUrl = import.meta.env.DEV;
            const response = await fetch(`${apiUrl}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            });

            const data = await response.json().catch(() => null);

            if (response.ok && data?.success) {
                setSubmitted(true);
                setFormState({ name: '', email: '', subject: '', message: '', companyUrl: '' });
            } else {
                let parsedError = null;
                if (data?.message) {
                    parsedError = data.message;
                } else if (data?.detail) {
                    parsedError = data.detail;
                } else if (data?.title && data.title !== 'Bad Request') {
                    parsedError = data.title;
                } else if (data?.error) {
                    parsedError = data.error;
                } else if (Array.isArray(data?.errors) && data.errors.length > 0) {
                    parsedError = data.errors.map((e) => e.defaultMessage || e.message || e).join('; ');
                } else if (response.status === 400) {
                    parsedError = 'Invalid request content. Please verify your name, email format, and message length.';
                } else if (response.status === 429) {
                    parsedError = 'Rate limit reached: Maximum 3 messages per 10 minutes allowed.';
                } else {
                    parsedError = `Server error (${response.status}): Failed to send note.`;
                }
                setErrorMessage(parsedError);
            }
        } catch (err) {
            setErrorMessage('Unable to connect to the backend server. Please verify the backend is running or contact directly via email.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-20 md:py-28 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-12">
                    <h2
                        className="text-3xl sm:text-4xl font-semibold tracking-tight"
                        style={{ color: 'var(--text-main)' }}
                    >
                        Let&apos;s Build Something Resilient Together
                    </h2>
                    <p className="mt-2 text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
                        I am actively exploring Software Engineering internships, full-stack opportunities,
                        and technical collaborations. Drop me a note below or reach out directly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Direct channels & Quick Connect */}
                    <div className="lg:col-span-5 space-y-5">
                        {/* Direct Email Card */}
                        <div
                            className="p-6 rounded-2xl border shadow-xs"
                            style={{
                                backgroundColor: 'var(--bg-card)',
                                borderColor: 'var(--border-subtle)',
                            }}
                        >
              <span className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: 'var(--text-muted)' }}>
                Primary Direct Channel
              </span>
                            <div
                                className="flex items-center justify-between p-3 rounded-xl border"
                                style={{
                                    backgroundColor: 'var(--bg-subtle)',
                                    borderColor: 'var(--border-subtle)',
                                }}
                            >
                                <div className="flex items-center gap-2.5 overflow-hidden">
                                    <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                                    <span className="text-xs sm:text-sm font-medium truncate" style={{ color: 'var(--text-main)' }}>
                    {personalInfo.email}
                  </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleCopyEmail}
                                    className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors shrink-0"
                                    style={{
                                        backgroundColor: 'var(--bg-card)',
                                        borderColor: 'var(--border-subtle)',
                                        color: 'var(--text-main)',
                                    }}
                                    title="Copy email to clipboard"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                                            <span className="text-emerald-600">Copied</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3.5 h-3.5" />
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Social channels (GitHub and LinkedIn) */}
                        <div
                            className="p-6 rounded-2xl border shadow-xs space-y-3"
                            style={{
                                backgroundColor: 'var(--bg-card)',
                                borderColor: 'var(--border-subtle)',
                            }}
                        >
              <span className="text-xs font-semibold uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>
                Professional Profiles
              </span>

                            <a
                                href={personalInfo.github}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between p-3 rounded-xl border transition-all hover:opacity-80 group"
                                style={{
                                    backgroundColor: 'var(--bg-subtle)',
                                    borderColor: 'var(--border-subtle)',
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <GithubIcon className="w-4 h-4" />
                                    <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-main)' }}>
                    GitHub
                  </span>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>

                            <a
                                href={personalInfo.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between p-3 rounded-xl border transition-all hover:opacity-80 group"
                                style={{
                                    backgroundColor: 'var(--bg-subtle)',
                                    borderColor: 'var(--border-subtle)',
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <LinkedinIcon className="w-4 h-4 text-blue-600" />
                                    <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-main)' }}>
                    LinkedIn
                  </span>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>

                            <a
                                href={personalInfo.leetcode}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between p-3 rounded-xl border transition-all hover:opacity-80 group"
                                style={{
                                    backgroundColor: 'var(--bg-subtle)',
                                    borderColor: 'var(--border-subtle)',
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <LeetcodeIcon className="w-4 h-4" />
                                    <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-main)' }}>
                                        LeetCode
                                    </span>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>

                            <a
                                href={personalInfo.codeforces}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between p-3 rounded-xl border transition-all hover:opacity-80 group"
                                style={{
                                    backgroundColor: 'var(--bg-subtle)',
                                    borderColor: 'var(--border-subtle)',
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <CodeforcesIcon className="w-4 h-4" />
                                    <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-main)' }}>
                                        Codeforces
                                    </span>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Clean Message Form */}
                    <div
                        className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border shadow-xs"
                        style={{
                            backgroundColor: 'var(--bg-card)',
                            borderColor: 'var(--border-subtle)',
                        }}
                    >
                        {submitted ? (
                            <div className="py-12 text-center space-y-3">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                                    <Check className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-main)' }}>
                                    Message Transmitted
                                </h3>
                                <p className="text-xs sm:text-sm max-w-sm mx-auto" style={{ color: 'var(--text-muted)' }}>
                                    Thank you for reaching out! I will review your note and respond back shortly.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSubmitted(false);
                                        setErrorMessage(null);
                                    }}
                                    className="mt-4 text-xs font-medium text-blue-600 hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Honeypot field (hidden from view, trap for bots) */}
                                <input
                                    type="text"
                                    name="companyUrl"
                                    value={formState.companyUrl}
                                    onChange={(e) => setFormState({ ...formState, companyUrl: e.target.value })}
                                    autoComplete="off"
                                    tabIndex="-1"
                                    style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                                />

                                {errorMessage && (
                                    <div 
                                        className="p-3.5 rounded-xl text-xs flex items-center justify-between gap-3 border shadow-xs transition-all"
                                        style={{
                                            backgroundColor: 'rgba(239, 68, 68, 0.08)',
                                            borderColor: 'rgba(239, 68, 68, 0.28)',
                                        }}
                                    >
                                        <div className="flex items-center gap-2.5 overflow-hidden">
                                            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                                            <span className="font-semibold text-rose-600 dark:text-rose-400 leading-snug">
                                                {errorMessage}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setErrorMessage(null)}
                                            className="text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 transition-colors shrink-0 p-1 rounded-md"
                                            title="Dismiss error"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-main)' }}>
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your Name"
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-all"
                                            style={{
                                                backgroundColor: 'var(--bg-subtle)',
                                                borderColor: 'var(--border-subtle)',
                                                color: 'var(--text-main)',
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-main)' }}>
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="you@domain.com"
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-all"
                                            style={{
                                                backgroundColor: 'var(--bg-subtle)',
                                                borderColor: 'var(--border-subtle)',
                                                color: 'var(--text-main)',
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-main)' }}>
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Engineering Role / Project Discussion"
                                        value={formState.subject}
                                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-all"
                                        style={{
                                            backgroundColor: 'var(--bg-subtle)',
                                            borderColor: 'var(--border-subtle)',
                                            color: 'var(--text-main)',
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-main)' }}>
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        required
                                        placeholder="Tell me about your team or project requirements..."
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-all resize-none"
                                        style={{
                                            backgroundColor: 'var(--bg-subtle)',
                                            borderColor: 'var(--border-subtle)',
                                            color: 'var(--text-main)',
                                        }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-medium transition-all shadow-sm hover:opacity-90 disabled:opacity-50"
                                    style={{
                                        backgroundColor: 'var(--text-main)',
                                        color: 'var(--bg-canvas)',
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            <span>Transmitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-3.5 h-3.5" />
                                            <span>Dispatch Note</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}