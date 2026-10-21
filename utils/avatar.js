export const getAvatarUrl = (user) => {
    if (!user) return null;
    const raw = user.image || user.avatar;
    if (!raw || typeof raw !== "string") return null;
    const trimmed = raw.trim();
    if (
        !trimmed ||
        trimmed === "undefined" ||
        trimmed === "null" ||
        trimmed === "none" ||
        trimmed.includes("/api/placeholder")
    ) {
        return null;
    }
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
        return trimmed;
    }
    const spacesUrl = (process.env.NEXT_PUBLIC_SPACES_URL || "").trim();
    if (!spacesUrl) return trimmed;
    return `${spacesUrl.replace(/\/$/, '')}/${trimmed.replace(/^\//, '')}`;
};

export const getInitials = (name) => {
    if (!name || typeof name !== "string") return "";
    const cleanName = name.replace(/[^\p{L}\p{N}\s]/gu, "").trim();
    const words = cleanName.split(/\s+/).filter(Boolean);
    if (words.length === 0) return "";
    if (words.length === 1) {
        return Array.from(words[0]).slice(0, 2).join("").toUpperCase();
    }
    const firstLetter = Array.from(words[0])[0] || "";
    const secondLetter = Array.from(words[1])[0] || "";
    return (firstLetter + secondLetter).toUpperCase();
};
