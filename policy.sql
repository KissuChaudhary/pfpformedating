CREATE POLICY "Enable insert for authenticated users only" ON "public"."credits" FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id));
CREATE POLICY "Enable insert for service role" ON "public"."credits" FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "Enable read access for authenticated users" ON "public"."credits" FOR SELECT TO authenticated USING ((auth.uid() = user_id));
CREATE POLICY "Enable read access for service role" ON "public"."credits" FOR SELECT TO service_role USING (true);
CREATE POLICY "Enable update for authenticated users" ON "public"."credits" FOR UPDATE TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));
CREATE POLICY "Enable update for service role" ON "public"."credits" FOR UPDATE TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role can delete credits" ON "public"."credits" FOR DELETE TO service_role USING (true);
CREATE POLICY "Service role can insert credits" ON "public"."credits" FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "Service role can read all credits" ON "public"."credits" FOR SELECT TO service_role USING (true);
CREATE POLICY "Service role can update credits" ON "public"."credits" FOR UPDATE TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Users can create their own credits" ON "public"."credits" FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id));
CREATE POLICY "Users can update their own credits" ON "public"."credits" FOR UPDATE TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));
CREATE POLICY "Users can view their own credits" ON "public"."credits" FOR SELECT TO authenticated USING ((auth.uid() = user_id));

CREATE POLICY "Service role can insert payments" ON "public"."dodo_payments" FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "Service role can read all payments" ON "public"."dodo_payments" FOR SELECT TO service_role USING (true);
CREATE POLICY "Service role can update payments" ON "public"."dodo_payments" FOR UPDATE TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Users can create their own payments" ON "public"."dodo_payments" FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id));
CREATE POLICY "Users can view their own payments" ON "public"."dodo_payments" FOR SELECT TO authenticated USING ((auth.uid() = user_id));

CREATE POLICY "Anonymous users can view active pricing plans" ON "public"."dodo_pricing_plans" FOR SELECT TO anon USING ((is_active = true));
CREATE POLICY "Authenticated users can view active pricing plans" ON "public"."dodo_pricing_plans" FOR SELECT TO authenticated USING ((is_active = true));
CREATE POLICY "Service role can manage pricing plans" ON "public"."dodo_pricing_plans" FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role can manage webhook events" ON "public"."dodo_webhook_events" FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role only" ON "public"."followup_email_logs" FOR ALL USING (false);

CREATE POLICY "Service role can update jobs" ON "public"."generation_jobs" FOR UPDATE USING (true);
CREATE POLICY "Users can insert own jobs" ON "public"."generation_jobs" FOR INSERT WITH CHECK ((auth.uid() = user_id));
CREATE POLICY "Users can view own jobs" ON "public"."generation_jobs" FOR SELECT USING ((auth.uid() = user_id));

CREATE POLICY "Enable insert for service role" ON "public"."images" FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "Enable read access for all authenticated users" ON "public"."images" FOR SELECT TO authenticated USING ((auth.uid() = (SELECT models.user_id FROM models WHERE (models.id = images."modelId"))));
CREATE POLICY "Users can delete images from their own models" ON "public"."images" FOR DELETE USING ((EXISTS (SELECT 1 FROM models WHERE ((models.id = images."modelId") AND (models.user_id = auth.uid())))));
CREATE POLICY "Users can delete their own images" ON "public"."images" FOR DELETE TO authenticated USING ((EXISTS (SELECT 1 FROM models WHERE ((models.id = images."modelId") AND (models.user_id = auth.uid())))));
CREATE POLICY "Users can insert images for their own models" ON "public"."images" FOR INSERT WITH CHECK ((EXISTS (SELECT 1 FROM models WHERE ((models.id = images."modelId") AND (models.user_id = auth.uid())))));
CREATE POLICY "Users can view images from their own models" ON "public"."images" FOR SELECT USING ((EXISTS (SELECT 1 FROM models WHERE ((models.id = images."modelId") AND (models.user_id = auth.uid())))));

CREATE POLICY "Enable insert for signed in users" ON "public"."models" FOR INSERT TO authenticated WITH CHECK ((user_id = auth.uid()));
CREATE POLICY "Enable read access for authenticated users" ON "public"."models" FOR SELECT TO authenticated USING ((auth.uid() = user_id));
CREATE POLICY "Enable update from service role" ON "public"."models" FOR UPDATE TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Users can create their own models" ON "public"."models" FOR INSERT WITH CHECK ((auth.uid() = user_id));
CREATE POLICY "Users can delete their own models" ON "public"."models" FOR DELETE USING ((auth.uid() = user_id));
CREATE POLICY "Users can update their own models" ON "public"."models" FOR UPDATE USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));
CREATE POLICY "Users can view their own models" ON "public"."models" FOR SELECT USING ((auth.uid() = user_id));

CREATE POLICY "Service role can update preview images" ON "public"."preview_images" FOR UPDATE USING (true);
CREATE POLICY "Users can insert own preview images" ON "public"."preview_images" FOR INSERT WITH CHECK ((auth.uid() = user_id));
CREATE POLICY "Users can view own preview images" ON "public"."preview_images" FOR SELECT USING ((auth.uid() = user_id));

CREATE POLICY "Users can update own profile" ON "public"."profiles" FOR UPDATE TO authenticated USING ((auth.uid() = user_id));
CREATE POLICY "Users can view own profile" ON "public"."profiles" FOR SELECT TO authenticated USING ((auth.uid() = user_id));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."samples" FOR INSERT TO authenticated WITH CHECK ((auth.uid() = (SELECT models.user_id FROM models WHERE (models.id = samples."modelId"))));
CREATE POLICY "Enable read access for authenticated users" ON "public"."samples" FOR SELECT TO authenticated USING ((auth.uid() = (SELECT models.user_id FROM models WHERE (models.id = samples."modelId"))));
CREATE POLICY "Enable updates for authenticated users to samples" ON "public"."samples" FOR UPDATE TO authenticated WITH CHECK ((auth.uid() = (SELECT models.user_id FROM models WHERE (models.id = samples."modelId"))));

CREATE POLICY "Enable insert for authenticated users" ON "public"."user_feedback" FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id));
CREATE POLICY "Enable insert for service role" ON "public"."user_feedback" FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "Enable read for authenticated users" ON "public"."user_feedback" FOR SELECT TO authenticated USING ((auth.uid() = user_id));
CREATE POLICY "Enable read for service role" ON "public"."user_feedback" FOR SELECT TO service_role USING (true);
