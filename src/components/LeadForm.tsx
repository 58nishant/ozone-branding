import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { supabase } from "../lib/supabase";

type LeadData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  location: string;
  propertyType: string;
  goal: string;
  timeline: string;
  advertising: string;
  budget: string;
  decisionRole: string;
  website: string;
  notes: string;
};

const initialData: LeadData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  businessType: "",
  location: "",
  propertyType: "",
  goal: "",
  timeline: "",
  advertising: "",
  budget: "",
  decisionRole: "",
  website: "",
  notes: "",
};

const fieldClass =
  "w-full border-b border-white/25 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#D5FF66]";

const labelClass =
  "mb-2 block text-xs font-medium uppercase tracking-wider text-white/65";

function LeadForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<LeadData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [updateToken, setUpdateToken] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const update = (field: keyof LeadData, value: string) => {
    setData((previous) => ({ ...previous, [field]: value }));
  };

  const next = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSaving) return;

    setErrorMessage("");
    setIsSaving(true);

    try {
      if (step === 1) {
        const { data: result, error } = await supabase.functions.invoke<{
          leadId: string;
          token: string;
        }>("ozone-leads", {
          body: {
            action: "create",
            lead: {
              name: data.name,
              email: data.email,
              phone: data.phone,
              company: data.company,
            },
          },
        });

        if (error) {
          throw new Error("We couldn't save your details. Please try again.");
        }

        if (!result?.leadId || !result?.token) {
          throw new Error(
            "We couldn't confirm your saved details. Please try again.",
          );
        }

        setLeadId(result.leadId);
        setUpdateToken(result.token);
        setStep(2);
        return;
      }

      if (step < 4) {
        setStep((previous) => previous + 1);
        return;
      }

      if (!leadId || !updateToken) {
        throw new Error(
          "Your enquiry session is missing. Please restart the form.",
        );
      }

      const { error } = await supabase.functions.invoke("ozone-leads", {
        body: {
          action: "complete",
          leadId,
          token: updateToken,
          lead: {
            business_type: data.businessType,
            location: data.location,
            property_category: data.propertyType,
            goal: data.goal,
            timeline: data.timeline,
            advertising_status: data.advertising,
            budget: data.budget,
            decision_role: data.decisionRole,
            website: data.website,
            notes: data.notes,
          },
        },
      });

      if (error) {
        throw new Error("We couldn't submit your enquiry. Please try again.");
      }

      setSubmitted(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const selectClass =
    "w-full border border-white/20 bg-[#242424] px-4 py-3 text-sm text-white outline-none focus:border-[#D5FF66]";

  if (submitted) {
    return (
      <div className="bg-[#242424] p-8 text-white sm:p-10">
        <Check size={32} className="mb-6 text-[#D5FF66]" />
        <h3 className="text-3xl font-bold">THANK YOU.</h3>
        <p className="mt-3 text-sm leading-6 text-white/65">
          Your form demonstration is complete. Database submission is not
          connected yet.
        </p>
        <button
          type="button"
          onClick={() => {
            setData(initialData);
            setStep(1);
            setSubmitted(false);
          }}
          className="mt-6 text-sm underline underline-offset-4"
        >
          Start again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={next} className="bg-[#242424] p-6 text-white sm:p-9">
      {errorMessage && (
        <div
          role="alert"
          className="mb-6 border border-red-400/40 bg-red-400/10 p-4 text-sm text-red-200"
        >
          {errorMessage}
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#D5FF66]">
          PROJECT ENQUIRY
        </p>
        <p className="text-xs text-white/55">STEP {step} OF 4</p>
      </div>

      <div className="mb-9 flex gap-2" aria-label={`Step ${step} of 4`}>
        {[1, 2, 3, 4].map((number) => (
          <div
            key={number}
            className={`h-1 flex-1 ${
              number <= step ? "bg-[#D5FF66]" : "bg-white/15"
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold">LET'S START WITH YOU.</h3>
            <p className="mt-2 text-sm text-white/55">
              Tell us how to reach you.
            </p>
          </div>

          <div>
            <label className={labelClass} htmlFor="lead-name">
              Full name *
            </label>
            <input
              id="lead-name"
              name="name"
              autoComplete="name"
              required
              className={fieldClass}
              placeholder="Your full name"
              value={data.name}
              onChange={(event) => update("name", event.target.value)}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="lead-email">
              Business email *
            </label>
            <input
              id="lead-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={fieldClass}
              placeholder="you@company.com"
              value={data.email}
              onChange={(event) => update("email", event.target.value)}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="lead-phone">
              Phone / WhatsApp *
            </label>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              className={fieldClass}
              placeholder="+91 ..."
              value={data.phone}
              onChange={(event) => update("phone", event.target.value)}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="lead-company">
              Company / project *
            </label>
            <input
              id="lead-company"
              name="company"
              required
              className={fieldClass}
              placeholder="Company or project name"
              value={data.company}
              onChange={(event) => update("company", event.target.value)}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold">TELL US ABOUT YOUR BUSINESS.</h3>
            <p className="mt-2 text-sm text-white/55">
              Help us understand your market.
            </p>
          </div>

          <div>
            <label className={labelClass} htmlFor="business-type">
              Business type *
            </label>
            <select
              id="business-type"
              required
              className={selectClass}
              value={data.businessType}
              onChange={(event) => update("businessType", event.target.value)}
            >
              <option value="">Select business type</option>
              <option value="developer_builder">Developer / Builder</option>
              <option value="broker_agent">Broker / Agent</option>
              <option value="agency">Marketing agency</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="lead-location">
              Country / city *
            </label>
            <input
              id="lead-location"
              required
              className={fieldClass}
              placeholder="e.g. Ahmedabad, India"
              value={data.location}
              onChange={(event) => update("location", event.target.value)}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="property-type">
              Property category *
            </label>
            <select
              id="property-type"
              required
              className={selectClass}
              value={data.propertyType}
              onChange={(event) => update("propertyType", event.target.value)}
            >
              <option value="">Select property category</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="land">Plots / Land</option>
              <option value="mixed">Mixed-use</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold">
              WHAT ARE YOU LOOKING TO ACHIEVE?
            </h3>
            <p className="mt-2 text-sm text-white/55">
              This helps us understand your priorities.
            </p>
          </div>

          <div>
            <label className={labelClass} htmlFor="lead-goal">
              Primary goal *
            </label>
            <select
              id="lead-goal"
              required
              className={selectClass}
              value={data.goal}
              onChange={(event) => update("goal", event.target.value)}
            >
              <option value="">Select your main goal</option>
              <option value="qualified_leads">
                Generate qualified enquiries
              </option>
              <option value="project_launch">Launch a new project</option>
              <option value="brand_awareness">Build brand awareness</option>
              <option value="improve_campaigns">
                Improve existing campaigns
              </option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="lead-timeline">
              When do you want to start? *
            </label>
            <select
              id="lead-timeline"
              required
              className={selectClass}
              value={data.timeline}
              onChange={(event) => update("timeline", event.target.value)}
            >
              <option value="">Select timeline</option>
              <option value="immediately">As soon as possible</option>
              <option value="within_month">Within one month</option>
              <option value="one_to_three_months">Within 1–3 months</option>
              <option value="exploring">Just exploring</option>
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="lead-advertising">
              Are you advertising currently? *
            </label>
            <select
              id="lead-advertising"
              required
              className={selectClass}
              value={data.advertising}
              onChange={(event) => update("advertising", event.target.value)}
            >
              <option value="">Select an option</option>
              <option value="yes_inhouse">Yes, in-house</option>
              <option value="yes_agency">Yes, with an agency</option>
              <option value="no">Not currently</option>
            </select>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold">LET'S DISCUSS THE DETAILS.</h3>
            <p className="mt-2 text-sm text-white/55">
              A few final details help us assess the project.
            </p>
          </div>

          <div>
            <label className={labelClass} htmlFor="lead-budget">
              Monthly marketing budget *
            </label>
            <select
              id="lead-budget"
              required
              className={selectClass}
              value={data.budget}
              onChange={(event) => update("budget", event.target.value)}
            >
              <option value="">Select a budget range</option>
              <option value="under_25k">Under ₹25,000</option>
              <option value="25k_50k">₹25,000–₹50,000</option>
              <option value="50k_1l">₹50,000–₹1 lakh</option>
              <option value="1l_3l">₹1–₹3 lakh</option>
              <option value="above_3l">Above ₹3 lakh</option>
              <option value="unsure">Not sure yet</option>
            </select>
            <p className="mt-2 text-xs leading-5 text-white/45">
              Combined advertising spend and marketing fees. International
              budget options can be configured later.
            </p>
          </div>

          <div>
            <label className={labelClass} htmlFor="lead-role">
              Your role in the decision *
            </label>
            <select
              id="lead-role"
              required
              className={selectClass}
              value={data.decisionRole}
              onChange={(event) => update("decisionRole", event.target.value)}
            >
              <option value="">Select your role</option>
              <option value="decision_maker">Final decision-maker</option>
              <option value="influencer">
                Part of the decision-making team
              </option>
              <option value="researching">Researching options</option>
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="lead-website">
              Website / project link (optional)
            </label>
            <input
              id="lead-website"
              type="url"
              className={fieldClass}
              placeholder="https://..."
              value={data.website}
              onChange={(event) => update("website", event.target.value)}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="lead-notes">
              Additional details (optional)
            </label>
            <textarea
              id="lead-notes"
              rows={3}
              className={fieldClass}
              placeholder="Tell us about your project..."
              value={data.notes}
              onChange={(event) => update("notes", event.target.value)}
            />
          </div>
        </div>
      )}

      <div className="mt-9 flex items-center justify-between gap-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((previous) => previous - 1)}
            className="inline-flex items-center gap-2 py-3 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        ) : (
          <span className="text-xs text-white/40">* Required fields</span>
        )}

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-4 bg-[#D5FF66] px-5 py-4 text-sm font-bold text-[#242424] transition hover:bg-white"
        >
          {isSaving ? "SAVING..." : step === 4 ? "SUBMIT ENQUIRY" : "CONTINUE"}

          {!isSaving &&
            (step === 4 ? <Check size={18} /> : <ArrowRight size={18} />)}
        </button>
      </div>
    </form>
  );
}

export default LeadForm;
