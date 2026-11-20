import test from "node:test";
import assert from "node:assert/strict";
import { createMailto, validateContact } from "../src/lib/contact.ts";

const valid = {
  name: "Alex Morgan",
  email: "alex@example.com",
  message: "Let’s build a useful developer tool together.",
};
test("rejects empty, malformed, and whitespace-only submissions", () => {
  assert.deepEqual(
    Object.keys(
      validateContact({ name: "  ", email: "invalid", message: "   " }),
    ),
    ["name", "email", "message"],
  );
  assert.deepEqual(validateContact(valid), {});
});
test("rejects oversized fields and header injection", () => {
  assert.ok(validateContact({ ...valid, name: "a".repeat(101) }).name);
  assert.ok(validateContact({ ...valid, message: "a".repeat(2001) }).message);
  assert.ok(
    validateContact({ ...valid, name: "Alex\r\nBcc: someone@example.com" })
      .name,
  );
  assert.ok(
    validateContact({
      ...valid,
      email: "alex@example.com\nBcc: another@example.com",
    }).email,
  );
  assert.throws(() =>
    createMailto({ ...valid, email: "bad" }, "owner@example.com"),
  );
});
test("encodes user content without creating extra mailto parameters", () => {
  const fields = {
    ...valid,
    name: "Zoë & Alex",
    message: "Plan: A&B? #1\nUse Unicode: 你好.\n&bcc=other@example.com",
  };
  const url = new URL(createMailto(fields, "owner@example.com"));
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "owner@example.com");
  assert.equal(
    url.searchParams.get("subject"),
    "Portfolio enquiry from Zoë & Alex",
  );
  assert.equal(
    url.searchParams.get("body"),
    `${fields.message}\n\nFrom: Zoë & Alex\nReply to: alex@example.com`,
  );
  assert.deepEqual([...url.searchParams.keys()], ["subject", "body"]);
});
