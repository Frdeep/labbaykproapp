-- Create the documents bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true);

-- Storage security policies
CREATE POLICY "Anyone can view documents"
ON storage.objects FOR SELECT
USING ( bucket_id = 'documents' );

CREATE POLICY "Users can upload documents"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'documents' AND auth.role() = 'authenticated' );

CREATE POLICY "Users can update own documents"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'documents' AND auth.uid() = owner );

CREATE POLICY "Users can delete own documents"
ON storage.objects FOR DELETE
USING ( bucket_id = 'documents' AND auth.uid() = owner );
