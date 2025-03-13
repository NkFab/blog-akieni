import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import PostsPage from "@/app/posts/page";
import { test, expect } from '@jest/globals';

test("renders post list", async () => {
    render(<PostsPage />);
    expect(await screen.findByText("Blog Posts")).toBeDefined();
});
// test("renders post list", async () => {
//     render(<PostsPage />);
//     expect(await screen.findByText("Blog Posts")).toBeInTheDocument();
// });
