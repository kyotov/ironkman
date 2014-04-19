module Jekyll
	class Picture < Liquid::Tag
		
		def initialize(tag_name, name, tokens)
			super
			@name = name.strip
		end

		def render(context)

			site_url = context["site"]["url"]

			page_images_dir = context["page"]["images-tag"]

			image_url = "#{site_url}/images/#{page_images_dir}/#{@name}"

			<<-MARKUP
				<a href="#{image_url}-large.jpg">
					<img src="#{image_url}-small.jpg" />
				</a>
			MARKUP

		end

	end
end

Liquid::Template.register_tag('picture', Jekyll::Picture)
