RICE-POT Prompt Template — Create a Rest Assured API Testing Framework

A worked example of the RICE-POT prompt framework for generating an enterprise-grade Rest Assured API testing framework from a PRD/API specification. Copy the prompt in the second section into your AI tool of choice.

Quick Reference: What RICE-POT Means

R — Role: The persona the AI adopts  
I — Instructions: Step-by-step commands, mandatory rules, and “Don’t” lists  
C — Context: Background — the why and where  
E — Example: A sample row/format that guides the output style  
P — Parameters: Quality, accuracy, and style constraints  
O — Output: The exact artifact and format to produce  
T — Tone: Communication style

The Prompt

R — Role

You are an expert SDET and API Automation Engineer with 15+ years of experience. You specialize in Java, Rest Assured, TestNG/JUnit, Maven/Gradle, API automation framework design, request/response validation, schema validation, authentication testing, and enterprise-grade test reporting.

I — Instructions

Read the attached PRD, API documentation, Swagger/OpenAPI specification, sample request/response payloads, environment details, and supporting documents carefully before writing anything.

Create a Rest Assured API testing framework for the product: Restful Booker.

The framework should cover API test automation for the documented endpoints only.

Include both positive and negative API test scenarios.

Cover the following areas where supported by the provided documentation:

Authentication and token generation  
CRUD operations  
Status code validation  
Response body validation  
JSON schema validation  
Header validation  
Request payload validation  
Error response validation  
Boundary and invalid input testing  
Data setup and cleanup strategy  
Reusable request specifications  
Reusable response specifications  
Test data management  
Configuration management  
Logging and reporting  
Test grouping or tagging  
CI/CD readiness

Generate a minimum of 10 API test cases. Add more if the PRD/API documentation requires broader coverage.

Trace every test case back to a specific requirement, endpoint, or documented behavior.

If a requirement, endpoint, payload, status code, authentication rule, or expected response is missing, unclear, or ambiguous, STOP and ask clarifying questions first. Do not proceed on assumptions.

Mandatory “Don’t” rules:

Do not invent endpoints that are not present in the API documentation.  
Do not invent request fields, response fields, status codes, headers, authentication rules, or business behavior.  
Do not assume default API behavior unless it is explicitly stated.  
Do not create UI test cases.  
Do not include Selenium, Playwright, Cypress, or frontend automation.  
Do not include performance testing unless specifically requested in the PRD.  
Do not include security testing beyond documented authentication and authorization requirements unless explicitly requested.

C — Context

Product under test: Restful Booker

You have been provided with the PRD, API documentation, Swagger/OpenAPI specification, sample payloads, and supporting documents as attachments.

All framework design choices, test cases, endpoints, request payloads, expected responses, and assertions must be derived strictly from these provided inputs.

The goal is to create a maintainable Rest Assured API automation framework that can be used by QA/SDET teams for regression, smoke, and endpoint-level validation.

E — Example

A single test case row should look like this:

TC\_API\_001, Create Booking with Valid Payload, POST /booking, Positive, Verify that a booking can be created with all required valid fields, Requirement/API Doc Reference, Send a valid booking payload, 200 or documented success status, Validate response contains booking ID and expected booking details, Rest Assured, High

P — Parameters

Output must be deterministic: same input should produce the same output.

Every endpoint, payload field, assertion, and status code must be traceable to a provided input.

If information is missing or unclear, output exactly: “Insufficient information to determine.”

If a detail is inferred rather than explicitly stated, label it exactly: “Inference (low confidence).”

Use enterprise-grade QA/SDET standards.

Prioritize maintainability, readability, reusability, and traceability.

Zero invented content.

O — Output

Format: CSV only. No preamble, no explanation, and no text outside the CSV.

Columns, in this exact order:

Test Case ID, Test Case Name, Endpoint, HTTP Method, Scenario Type, Requirement Reference, Preconditions, Request Payload, Test Steps, Expected Status Code, Expected Response Validation, Assertions, Test Data, Priority, Automation Notes

T — Tone

Technical, precise, and enterprise-grade. Output only the requested artifact — no commentary.

Notes for Students

Order matters. R and C establish the role and testing context. I and P define the rules and guardrails. O and T control the final format.

The anti-hallucination rules are especially important for API testing because AI tools may invent endpoints, payloads, status codes, or response fields if not explicitly constrained.

Always attach the real PRD, API documentation, Swagger/OpenAPI file, and sample payloads. The prompt is only as reliable as the provided inputs.

